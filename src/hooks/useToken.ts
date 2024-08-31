
import { useAuth} from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";


export const useToken = () => {
    const { getToken } = useAuth();

    return useQuery<string | null, Error, string>({
        queryKey: ['token'],
    queryFn:async () => {
        const token = await getToken();
        return token
    }, 
    staleTime: 10 * 1000,
    retry: 3
    })

} 