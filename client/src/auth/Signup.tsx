import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupInputFields, UserSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Separator } from "@radix-ui/react-separator";
import { Contact, Loader2, Lock, Mail, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//zod provide this functionality
// interface SignupInputFields {
//   fullname: string;
//   email: string;
//   password: string;
//   contact: string;
// }

const Signup = () => {
  const [input, setInput] = useState<SignupInputFields>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  const HandleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<SignupInputFields>>({});
  const { signup, loading } = useUserStore();

  const HandleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    //validation check
    const result = UserSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputFields>);
      return;
    }

    //SighUP API
    try {
      signup(input);
      navigate("/verify-email");
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={HandleLoginSubmit}
        className="md:p-8 w-full max-w-md md:border border-gray-200 rounded-lg mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Hello There</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="pl-10 focus-visible:ring-1"
              value={input.fullname}
              onChange={HandleChangeEvent}
            ></Input>
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.fullname}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="pl-10 focus-visible:ring-1"
              value={input.email}
              onChange={HandleChangeEvent}
            ></Input>
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-10 focus-visible:ring-1"
              value={input.password}
              onChange={HandleChangeEvent}
            ></Input>
            <Lock className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              name="contact"
              placeholder="Contact Number"
              className="pl-10 focus-visible:ring-1"
              value={input.contact}
              onChange={HandleChangeEvent}
            ></Input>
            <Contact className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button
              disabled
              type="submit"
              className="w-full bg-orange hover:bg-hoverGreen"
            >
              <Loader2 className="mr-1   h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-full bg-orange hover:bg-hoverGreen">
              Signup
            </Button>
          )}
        </div>
        <Separator className="border-b-2" />
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/Login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
