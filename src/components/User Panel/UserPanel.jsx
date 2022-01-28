import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './UserPanel.scss';

import API_getUserById from '../../api/getUserById';

const UserPanel = () => {
    const { id } = useParams();

    const [userData, setUserData] = useState(null);

    const history = useHistory();

    const getUserData = async () => {
        const data = await API_getUserById(id);

        if(data)
            setUserData(data);
        else
            history.replace("/dashboard/users/");
    }

    useEffect(() => {
        if (id) {
            const regEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

            if (!regEx.test(id))
                history.replace("/dashboard/users/");
            else {
                getUserData();
            }
        }
    }, [])

    return (
        <div>
            panel
        </div>
    );
}

export default UserPanel;