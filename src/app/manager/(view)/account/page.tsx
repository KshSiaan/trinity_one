import { Suspense } from "react";
import Account from "./account";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  return (
    <section>
      <Suspense
        fallback={
          <div className={`flex justify-center items-center h-24 mx-auto`}>
            <Loader2Icon className={`animate-spin`} />
          </div>
        }
      >
        <Account />
      </Suspense>
    </section>
  );
}
