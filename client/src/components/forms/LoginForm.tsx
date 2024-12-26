import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Eye as ShowPasswordIcon,
  EyeOff as HidePasswordIcon,
} from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { setAuthCredentials } from "../../redux/slices/authSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { api } from "../../service/axios.config";

export const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid",
  }),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/signin", {
        email: values.email,
        password: values.password,
      });
      const userData = response.data;
      dispatch(setAuthCredentials(userData.user));
      toast({
        description: `Welcome back ${userData.user.name} 🎉.`,
      });
      navigate("/");
    } catch (err: any) {
      console.log(err,"err");
      
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <div
                    className="absolute right-3 top-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <HidePasswordIcon size={20} />
                    ) : (
                      <ShowPasswordIcon size={20} />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Link
            to="/forgot-password"
            className="ps-1 text-xs text-blue-700 dark:text-blue-300"
          >
            Forgot your password?
          </Link>
        </div>
        <Button size="submit" variant="submit" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
        <Button
          className="dark:text-white w-full border rounded-md text-black text-center"
          type="button"
        >
          <span className="text-xs text-gray-500">Don't have an account?</span>
          <Link className="ps-1 text-xs text-blue-700" to="/signup">
            Sign up
          </Link>
        </Button>
        <p className="max-w-[22rem] text-xs font-thin dark:text-gray-500">
          By continuing to use our services, you acknowledge that you have both
          read and agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </Form>
  );
};
