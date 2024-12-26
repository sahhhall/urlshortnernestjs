import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import {  ArrowRight } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { api } from "../service/axios.config";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleShorten = async () => {
    setError("");
    setShortenedUrl("");

    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/create", { url });
      setShortenedUrl(response.data.shortUrl);
      toast({
        title: "Success!",
        description: "URL has been shortened successfully.",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to shorten URL. Please try again.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setUrl("");
    setShortenedUrl("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
      <div className="w-full border p-12 rounded-lg  min-h-40 max-w-md">
        <div>
          <h4 className="flex items-center gap-2">
            URL Shortener
          </h4>
        </div>
        <div>
          <div className="space-y-4 pt-2">
            {!shortenedUrl ? (
              <>
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Enter your long URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={error ? "border-red-500" : ""}
                  />
                  {error && (
                    <span className="text-sm text-red-500">{error}</span>
                  )}
                  <Button
                    onClick={handleShorten}
                    disabled={!url || loading}
                    className="w-full"
                    variant={'submit'}
                  >
                    {loading ? "Shortening..." : "Shorten URL"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Alert>
                  <AlertDescription className="flex items-center justify-between">
                    <span className="font-medium break-all">
                      {shortenedUrl}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(shortenedUrl);
                        toast({
                          description: "URL copied to clipboard!",
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </AlertDescription>
                </Alert>
                <Button className="w-full" variant={'signin'} onClick={handleReset}>
                  Shorten Another URL
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
