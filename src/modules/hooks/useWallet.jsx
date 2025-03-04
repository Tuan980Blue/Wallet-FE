
import { useQuery } from '@tanstack/react-query';
import {wGet} from "../../util/request.util.js";

// Custom hook lấy dữ liệu ví
export const useWallet = () => {
    return useQuery({
        queryKey: ['wallet'],
        queryFn: async () => await wGet('/v1/user/wallet'),
        staleTime: 10000 * 5,
    });
};
