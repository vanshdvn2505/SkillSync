"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import AuthHeader from "../components/auth-header";
import { loginSchema } from "@/types/zodSchema/loginSchema-zod";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutations/authMutations";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginFormDemo() {

  const { toast } = useToast();
  const router = useRouter();

  const [loginUser, { data, loading, error }] = useMutation(LOGIN);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Form submitted", data);
    try {
      const response = await loginUser({ variables: data });
      
      console.log(response);
      toast({
        title: "Login Successfull",
        duration: 1000,
      })
      setTimeout(() => {
        router.push('/home');
      }, 1000)
      
    } catch (error) {
        toast({
          title: "Login Up Failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
    }
  };

  return (
    <div className="z-10 h-screen w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent flex flex-col justify-center items-center">
      <AuthHeader />

      <form className="my-8 lg:w-1/2 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 mb-4">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-accent">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              className="focus:ring-primary focus:border-primary text-accent"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 text-accent">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              className="focus:ring-primary focus:border-primary text-accent"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </LabelInputContainer>
        </div>

        <button
          className="bg-primary relative group/btn block w-full text-primary-foreground rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="button">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]" type="button">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>

      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-4 lg:hidden block md:hidden">
        Don't have an account? <Link href="/signup" className="text-primary-500 hover:text-primary-600">Sign up here</Link>.
      </p>
    </div>
  );
}


const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
