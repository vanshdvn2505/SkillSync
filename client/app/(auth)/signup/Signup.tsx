"use client";
import React from "react";


import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import AuthHeader from "../components/auth-header";
import { useMutation } from "@apollo/client";
import { signupSchema } from "@/types/zodSchema/signupSchema-zod";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { SIGNUP } from "@/graphql/mutations/authMutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignupFormDemo() {

  const { toast } = useToast();

  const [createUser, { data, loading, error }] = useMutation(SIGNUP);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: any) => {
    // console.log("Form submitted", data);
    try {
      const response = await createUser({ variables: data });
      // console.log(response);
      toast({
        title: "SignUp Successfull",
        description: "Verify Email To Continue",
        duration: 5000,
      })
      
    } catch (error) {
      console.error("SignUp error ", error);
      toast({
        title: "Sign Up Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="z-10 text-primary-foreground h-screen w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent flex flex-col justify-center items-center ">
      <AuthHeader />
      <form className="lg:w-1/2 w-full mt-28" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName" className="text-accent">First name</Label>
            <Input id="firstName" placeholder="Tyler" type="text" {...register("firstName")} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName?.message as string}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName" className="text-accent">Last name</Label>
            <Input id="lastName" placeholder="Durden" type="text" {...register("lastName")} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName?.message as string}</p>}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-accent">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email?.message as string}</p>}
        </LabelInputContainer>?
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-accent">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password?.message as string}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="gender" className="text-accent">Gender</Label>
          <select id="gender" {...register("gender")} className="p-2 border border-accent rounded text-accent">
            <option value="" className="text-accent">Select Gender</option>
            <option value="Male" className="text-accent">Male</option>
            <option value="Female" className="text-accent">Female</option>
            <option value="Other" className="text-accent">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender?.message as string}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="role" className="text-accent">Role</Label>
          <select id="role" {...register("role")} className="p-2 border-accent border rounded text-accent">
            <option value="" className="text-accent">Select Role</option>
            <option value="Mentor" className="text-accent">Mentor</option>
            <option value="Learner" className="text-accent">Learner</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role?.message as string}</p>}
        </LabelInputContainer>

        <button className="bg-primary relative group/btn block w-full text-primary-foreground rounded-md h-10 font-medium shadow-input" type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900" type="button">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900" type="button">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Google</span>
            <BottomGradient />
          </button>
        </div>
      </form>

      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-4 block lg:hidden md:hidden">
        If you already have an account, {" "}
        <Link href="/login" className="text-primary-500 hover:text-primary-600">
          login here
        </Link>.
      </p>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);
