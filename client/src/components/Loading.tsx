import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br via-bg-lightGreen  flex items-center justify-center relative overflow-hidden">
      <Loader className="animate-spin w-16 h-16 text-black" />
    </div>
  );
};

export default Loading;
