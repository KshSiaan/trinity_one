"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import {
  addCategoryApi,
  deleteCategoryApi,
  getCategoriesApi,
  updateCategoryApi,
} from "@/lib/api/admin";
import { imgCreator } from "@/lib/functions";
import { idk } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EditIcon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function Page() {
  const [{ token }] = useCookies(["token"]);
  const qcl = useQueryClient();
  const [files, setFiles] = useState<File[] | undefined>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState<{ [key: string]: boolean }>({});
  const [categoryName, setCategoryName] = useState("");
  // ADD DIALOG STATE
  const [openAdd, setOpenAdd] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(token),
  });
  // ADD CATEGORY
  const { mutate } = useMutation({
    mutationKey: ["add_category"],
    mutationFn: (body: FormData) => addCategoryApi(token, body),
    onError: (err) =>
      toast.error(err.message ?? "Failed to complete this request"),
    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully category created!");
      setOpenAdd(false);
      setFiles([]);
      setPreview(null);
      setCategoryName("");
      qcl.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // UPDATE CATEGORY
  const { mutate: update } = useMutation({
    mutationKey: ["update_category"],
    mutationFn: ({ id, body }: { id: string | number; body: FormData }) =>
      updateCategoryApi(id, token, body),

    onError: (err) =>
      toast.error(err.message ?? "Failed to complete this request"),

    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully category updated!");

      qcl.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { mutate: deleter } = useMutation({
    mutationKey: ["delete_category"],
    mutationFn: ({ id }: { id: string | number }) =>
      deleteCategoryApi(id, token),

    onError: (err) =>
      toast.error(err.message ?? "Failed to complete this request"),

    onSuccess: (res: idk) => {
      toast.success(res.message ?? "Successfully deleted category!");

      qcl.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleDrop = (incoming: File[]) => {
    const oneFile = incoming[0];
    if (!oneFile) return;
    setFiles([oneFile]);
    const url = URL.createObjectURL(oneFile);
    setPreview(url);
  };

  const handleAdd = () => {
    const formData = new FormData();

    if (files?.[0]) {
      formData.append("icon", files[0]);
    }

    formData.append("name", categoryName || "");

    mutate(formData);
  };

  if (isPending) {
    return (
      <div className={`flex justify-center items-center h-24 mx-auto`}>
        <Loader2Icon className={`animate-spin`} />
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl">Manage Preference Category</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Your categories & subcategories
          </CardTitle>
        </CardHeader>

        {/* LIST ITEMS */}
        <CardContent className="space-y-4">
          {data?.data?.data?.map((category: idk) => (
            <div
              key={category.id}
              className="p-4 rounded-lg border flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="size-12 aspect-square border overflow-hidden rounded relative">
                  {category.icon && (
                    <Image
                      fill
                      src={imgCreator(category.icon)}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <h3>{category.name}</h3>
              </div>

              <div>
                {/* EDIT CATEGORY */}
                <Dialog
                  open={openEdit[category.id]}
                  onOpenChange={(v) =>
                    setOpenEdit({ ...openEdit, [category.id]: v })
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setOpenEdit({ ...openEdit, [category.id]: true })
                      }
                    >
                      <EditIcon />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="min-w-[80dvw]">
                    <DialogHeader>
                      <DialogTitle>Edit your category</DialogTitle>
                    </DialogHeader>

                    <EditCategoryForm
                      category={category}
                      update={update}
                      qcl={qcl}
                      close={() =>
                        setOpenEdit({ ...openEdit, [category.id]: false })
                      }
                    />
                  </DialogContent>
                </Dialog>

                {/* DELETE POPUP */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost">
                      <Trash2Icon />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent side="bottom" align="end">
                    <h3 className="font-semibold">Delete Category</h3>
                    <p className="text-sm">
                      If you delete the category, it will be removed permanently
                    </p>

                    <div className="w-full flex justify-between items-center mt-6">
                      <Button
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => {
                          deleter({ id: category.id });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </CardContent>

        {/* ADD NEW CATEGORY */}
        <CardFooter className="flex justify-center items-center">
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpenAdd(true)}>
                <PlusIcon />
                Add a new category
              </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[80dvw]">
              <DialogHeader>
                <DialogTitle>Add your category</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <Label>Upload Icon</Label>

                <Dropzone
                  accept={{ "image/*": [] }}
                  multiple={false}
                  onDrop={handleDrop}
                  onError={console.error}
                  src={files}
                >
                  {preview ? (
                    <div className="w-full h-40 rounded-md overflow-hidden border">
                      <img
                        src={preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <DropzoneEmptyState />
                      <DropzoneContent />
                    </>
                  )}
                </Dropzone>

                <Label>Category name</Label>

                <Input
                  placeholder="Category name..."
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button className="px-24" size="lg" onClick={handleAdd}>
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EDIT CATEGORY FORM COMPONENT */
/* ------------------------------------------------------------------ */

function EditCategoryForm({ category, update, qcl, close }: any) {
  const [editFiles, setEditFiles] = useState<File[] | undefined>([]);
  const [editPreview, setEditPreview] = useState<string | null>(
    category.icon ? imgCreator(category.icon) : null
  );
  const [editName, setEditName] = useState(category.name);

  const handleDrop = (incoming: File[]) => {
    const one = incoming[0];
    if (!one) return;
    setEditFiles([one]);
    setEditPreview(URL.createObjectURL(one));
  };

  const handleUpdate = () => {
    const fd = new FormData();

    if (editFiles?.[0]) fd.append("icon", editFiles[0]);
    fd.append("name", editName || "");

    update(
      { id: category.id, body: fd },
      {
        onSuccess: () => {
          setEditFiles([]);
          setEditPreview(null);
          setEditName("");
          qcl.invalidateQueries({ queryKey: ["categories"] });

          close(); // 👉 closes the modal properly
        },
      }
    );
  };

  return (
    <div className="space-y-6 mt-6">
      <Label>Upload Icon</Label>

      <Dropzone
        accept={{ "image/*": [] }}
        multiple={false}
        onDrop={handleDrop}
        src={editFiles}
      >
        {editPreview ? (
          <div className="w-full h-40 rounded-md overflow-hidden border">
            <img
              src={editPreview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <>
            <DropzoneEmptyState />
            <DropzoneContent />
          </>
        )}
      </Dropzone>

      <Label>Category name</Label>

      <Input value={editName} onChange={(e) => setEditName(e.target.value)} />

      <DialogFooter>
        <Button className="px-24" size="lg" onClick={handleUpdate}>
          Update
        </Button>
      </DialogFooter>
    </div>
  );
}
