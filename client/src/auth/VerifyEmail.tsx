import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const navigate = useNavigate();
  const { loading, verifyEmail } = useUserStore();
  const HandleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    //move to next input field if digit enterd
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };
  const HandleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode: string = otp.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {}
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2x">Verify your email</h1>
          <p className="text-sm text-gray-600 ">
            Enter the 6 digit code sent to your email
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                key={idx}
                type="text"
                ref={(elemet) => {
                  inputRef.current[idx] = elemet;
                }}
                maxLength={1}
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  HandleChange(idx, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  HandleKeyDown(idx, e);
                }}
                className="md:w-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          <div className="mt-6">
            {loading ? (
              <Button
                disabled
                type="submit"
                className="w-full bg-orange hover:bg-hoverGreen"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait.
              </Button>
            ) : (
              <Button className="w-full bg-orange hover:bg-hoverGreen">
                Verify
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default VerifyEmail;
