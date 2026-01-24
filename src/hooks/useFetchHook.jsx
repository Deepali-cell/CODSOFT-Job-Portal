import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetchHook = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session, isLoaded } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      let supabaseAccessToken = null;

      // ✅ token sirf tab lo jab user logged-in ho
      if (isLoaded && session) {
        supabaseAccessToken = await session.getToken({
          template: "supabase",
        });
      }

      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetchHook;
