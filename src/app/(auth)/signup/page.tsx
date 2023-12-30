"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Logo from "../../../../public/ideaFlow-logo-text.svg";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Loader from "@/components/global/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailCheck } from "lucide-react";
import { FormSchema } from "@/lib/types";
import { actionSignupUser } from "@/lib/server-actions/auth-actions";

const SignupFormSchema = z
  .object({
    email: z
      .string()
      .describe("Email")
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .describe("Password")
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(8, { message: "Password must be at least 8 characters long." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);

  const codeExcahngeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExcahngeError,
        "border-red-500/50": codeExcahngeError,
        "text-red-700": codeExcahngeError,
      }),
    []
  );

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignupFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
    const { error } = await actionSignupUser({ email, password });
    if (error) {
      setSubmitError(error.message);
      form.reset();
      return;
    }
    setConfirmation(true);
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link
          href="/"
          className="
          w-full
          flex
          justify-left
          items-center"
        >
          <Image src={Logo} alt="ideaFlow Logo" width={200} />
        </Link>
        <FormDescription className="text-washed-purple-500/80">
          An all-in-one idea management platform.
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!confirmation && !codeExcahngeError && (
          <>
            <Button
              type="submit"
              className="w-full p-6"
              size={"lg"}
              disabled={isLoading}
            >
              {!isLoading ? "Create Account" : <Loader />}
            </Button>
          </>
        )}
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <span className="self-center text-washed-purple-500/50">
          Already have an account?
          <Link href="/login" className="text-washed-purple-500 pl-2 text-lg">
            Log in
          </Link>
        </span>
        {(confirmation || codeExcahngeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExcahngeError && <MailCheck className="h-4 w-4" />}
              <AlertTitle>
                {" "}
                {codeExcahngeError ? "Invalid Link" : "Check your email."}{" "}
              </AlertTitle>
              <AlertDescription>
                {codeExcahngeError
                  ? "The link you have followed is invalid. Please try again."
                  : "We have sent you a confirmation link to your email. Please follow the link to confirm your account."}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  );
};

export default Signup;
