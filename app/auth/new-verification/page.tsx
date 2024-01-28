import { NewVerificationForm } from "@/components/NewVerificationForm";
import { Suspense } from "react";

const NewVerificationPage = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
