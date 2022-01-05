import React from 'react';
import styles from './styles.module.scss'
import {AppRootStateType} from "../../../../m2-bll/store";
import {useDispatch, useSelector} from "react-redux";
import {changeUserNameTC} from "../../profileReducer";
import {EditableSpan} from '../../../common/c6-EditableSpan/editableSpan';

const User = () => {
    const userName = useSelector<AppRootStateType, string>(state => state.profile.name)
    const avatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)
    const dispatch = useDispatch()

    const ChangeUserName = (newName: string) => {
        dispatch(changeUserNameTC({name: newName}))
    }

    return (
        <div className={styles.profile}>
            <div className={styles.profileInfo}>
                <div>
                    <img className={styles.avatar} src={avatar} alt=""/>
                </div>

                <div>
                    <EditableSpan value={userName} onChange={ChangeUserName}/>
                </div>
            </div>

        </div>
    );
};

export default User;
