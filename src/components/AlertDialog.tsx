import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { FC } from 'react'
import { Employee } from '../model/dto-types';
import { useColorModeValue } from './ui/color-mode';

interface Props {
    mutationDel: any;
    empl: Employee;
}

const AlertDialog: FC<Props> = ({ mutationDel, empl }) => {
    const bg = useColorModeValue("red.500", "red.200");

    return (
        <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
                <Button size="xs" background={bg} disabled={mutationDel.isPending}>Delete</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Deleting {empl.fullName}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                Are you sure you want to delete {empl.fullName}? This action cannot be undone.
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button colorPalette="red" onClick={() => mutationDel.mutate(empl.id)
                            }>Delete</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default AlertDialog