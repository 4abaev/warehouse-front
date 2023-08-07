import { EditIcon } from "@chakra-ui/icons";
import { Button, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure, IconButton, Box } from "@chakra-ui/react";
import { ReactNode } from "react";



export const CustomEditModal = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalBody>
                        {children}
                        <Box display="flex" justifyContent="space-between">
                            <Button type="submit" colorScheme="blue">Сохранить</Button>
                            <Button onClick={() => onClose()} colorScheme="facebook">Отмена</Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
