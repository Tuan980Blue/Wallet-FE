import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wGet, wPost } from '../../../util/request.util.js';
import InviteCard from "./InviteCard.jsx";

// Component hiển thị danh sách lời mời
const InviteFund = () => {
    const [showAll, setShowAll] = useState(false);
    const queryClient = useQueryClient();

    // Fetch danh sách lời mời bằng useQuery
    const { data: invitations = [], isLoading, isError } = useQuery({
        queryKey: ['invitations'],
        queryFn: () => wGet(`/v1/invitations/received`),
        staleTime: 5 * 60 * 1000, // Cache trong 5 phút
        cacheTime: 30 * 60 * 1000, // Giữ cache trong 30 phút
    });

    // Mutation xử lý chấp nhận lời mời
    const joinMutation = useMutation({
        mutationFn: (id) => wPost(`/v1/invitations/${id}/accept`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invitations'] });
            queryClient.invalidateQueries({ queryKey: ['groupFunds'] });
            alert('Bạn đã tham gia quỹ nhóm.');
        },
        onError: (error) => alert('Có lỗi xảy ra khi chấp nhận lời mời.'),
    });

    // Mutation xử lý từ chối lời mời
    const declineMutation = useMutation({
        mutationFn: (id) => wPost(`/v1/invitations/${id}/reject`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invitations'] });
            alert('Bạn đã từ chối lời mời.');
        },
        onError: (error) => alert('Có lỗi xảy ra khi từ chối lời mời.'),
    });

    const visibleInvitations = showAll ? invitations : invitations.slice(0, 4);

    if (isLoading) return <p>Loading invitations...</p>;

    return (
        <div className="bg-gray-50 py-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">Lời mời tham gia quỹ</h1>
            {invitations.length < 1 && (
                <p className="text-gray-500 text-center">Không có lời mời nào!</p>
            )}
            {invitations.length > 3 && (
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="font-semibold px-6 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                    >
                        {showAll ? "Thu gọn" : "Xem tất cả"}
                    </button>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
                {visibleInvitations.map((invite) => (
                    <InviteCard
                        key={invite.id}
                        groupName={invite.nameGroup}
                        createdAt={invite.createdAt}
                        senderEmail={invite.senderEmail}
                        avatar={invite.avatar || "/sanmay.png"}
                        onJoin={() => joinMutation.mutate(invite.id)}
                        onDecline={() => declineMutation.mutate(invite.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default InviteFund;
