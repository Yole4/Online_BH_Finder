import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/Services";

export const useFetchRecipientUser = (item, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const members = [item?.first_user, item?.second_user];

    const recipientId = members.find((id) => id !== user?.id);

    useEffect(() => {
        const getUser = async () => {

            if (!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

            if (response.error) {
                return setError(error);
            } else {
                setRecipientUser(response);
            }
        };
        getUser();
    }, []);

    return { recipientUser };
}