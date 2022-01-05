import React, {useState} from 'react';
import styles from './styles.module.scss'
import ContainerAuth from '../c4-containerAuth';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button';

export type ModalTypeAction = 'added' | 'delete' | 'edit' | 'deleteItem' | 'editItem' | 'addedItem' | ''

type ModalType = {
    openModal: boolean;
    setOpenModal: (bool: boolean) => void;
    setActionTC: (value?: string) => void;
    type: ModalTypeAction
}

const Modal = ({openModal, setOpenModal, setActionTC, type}: ModalType) => {
    const [value, setValue] = useState()
    const [value2, setValue2] = useState()
    const targetContainerExit = (e: any) => {
        if (e.target.closest('#modal') !== null) return
        setOpenModal(false)
    }
    const title =
        (type === 'added' && ' In this page yo can create a new packs list for study all people.') ||
        ((type === 'delete' || type === 'deleteItem') && 'Are you sure?') ||
        (type === 'edit' && 'Set a new name card') ||
        (type === 'editItem' && 'Set a new question') ||
        (type === 'addedItem' && 'Create task')

    console.log(type)
    return (
        <ContainerAuth className={`${!openModal && styles.hidden} ${styles.box}`} onClick={targetContainerExit}>
            <div className={styles.modal} id={'modal'}>
                <div>
                    <p className={styles.p}>
                        {title}
                    </p>
                </div>

                {
                    (type === 'edit' || type === 'added' || type === 'editItem') &&
                    <TextField variant={'outlined'} label={'Name pack'}
                               style={{width: '100%'}}
                               onChange={(e: any) => setValue(e.currentTarget.value)}/>
                }
                {type === 'addedItem' && (
                    <>
                        <TextField variant={'outlined'} label={'Question'}
                                   style={{width: '100%'}}
                                   onChange={(e: any) => setValue(e.currentTarget.value)}/>
                        <TextField variant={'outlined'} label={'Answer'}
                                   style={{width: '100%'}}
                                   onChange={(e: any) => setValue2(e.currentTarget.value)}/>
                    </>
                )}


                <div className={styles.btn}>
                    <Button variant="contained" onClick={setActionTC.bind(null, value, value2)} style={{
                        borderRadius: '20px',
                        background: '#21268F',
                        color: '#fff',
                        height: '40px',
                        width: '150px'
                    }}>Confirm</Button>

                    <Button onClick={setOpenModal.bind(null, false)} style={{
                        borderRadius: '20px',
                        background: '#D7D8EF',
                        color: '#21268F',
                        height: '40px',
                        width: '150px'
                    }}
                            variant="outlined">Exit</Button>
                </div>
            </div>
        </ContainerAuth>
    );
}
// color="success"
// color="error"
export default Modal
