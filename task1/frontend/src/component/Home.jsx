import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr ,Input, InputGroup, InputRightElement, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import { useEffect,useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deletecontact, editContact, getAllContact, postContact } from '../redux/action';

const Home = () => {
    const toast = useToast();
    const data = useSelector((state) => state.reducer.Contact.contacts);
    const error = useSelector((state) => state.reducer.isError);
    console.log('Error:', error);
    const [searchQuery, setSearchQuery] = useState('');
    const success = useSelector((state) => state.reducer)
    const loading = useSelector((state) => state.reducer.isLoading)
    console.log(error);
    const dispatch = useDispatch();
    const [editingContact, setEditingContact] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:editisOpen, onOpen:editOnOpen, onClose:editOnClose } = useDisclosure();
    const handleSearch = () => {
      
        dispatch(getAllContact(searchQuery));
        
      };
      
      const handleEdit = (id) => {
      
        const contactToEdit = data.find((item) => item._id === id);
    
      
        setEditingContact(contactToEdit);
    
       
        editOnOpen();
      };

      const handleUpdateContact = async () => {
        try {
          // Extract the necessary fields from the form data
          const { _id, firstName, lastName, email, phone } = editingContact;
    
          // Dispatch the update action
          await dispatch(editContact(_id, { firstName, lastName, email, phone }));
    
          // Dispatch the action to get all contacts
          await dispatch(getAllContact());
    
          // Display success toast
          toast({
            title: 'Contact Updated',
            description: 'Contact details updated successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
    
          // Close the modal after updating contact
          editOnClose()
        } catch (error) {
          console.error('Error updating contact:', error);
    
          // Display error toast
          toast({
            title: 'Error',
            description: 'Failed to update contact details. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      };
 

      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      });

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleAddContact = async () => {
        try {
          let firstName = formData.firstName;
          let lastName = formData.lastName;
          let phone = formData.phone;
          let email = formData.email;
      
          await dispatch(postContact({ firstName, lastName, email, phone }));
          dispatch(getAllContact());
      
          // Reset the form data
          setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
          });
      
          // Display success toast
          toast({
            title: 'Contact Added',
            description: 'Contact details submitted successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
      
          // Close the modal after adding contact
          onClose();
        } catch (error) {
          console.error('Error adding contact:', error);
      
          // Display error toast
          toast({
            title: 'Error',
            description: `Failed to submit contact details. Please try again.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      };

      const handleDelete = async(id)=>{
        try {
            await dispatch(deletecontact(id));
      
            await dispatch(getAllContact());

            toast({
              title: 'Contact Deleted',
              description: 'Delected.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } catch (error) {
            console.error("Error uploading media:", error);
          }
      }

   
      

      useEffect(() => {
        dispatch(getAllContact());
      }, [dispatch]);

  return (
    <Box>
     <Box   w={['95%', '80%', '60%', '40%']} 
        m="auto"
        mt="5"
        display="flex"
        flexDir={['column', 'column', 'row', 'row']} 
        gap={10} >
      <InputGroup>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="full"
          value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }}
          _focus={{
            borderColor: 'blue.500',
            boxShadow: '0 0 0 2px rgba(24, 115, 204, 0.2)',
          }}
        />
        <InputRightElement width="4.5rem" display="flex" alignItems="center">
          <Button
            h="100%"
            size="lg"
            onClick={handleSearch}
            bg="blue.500"
            color="white"
            borderRadius="full"
           
            _hover={{ bg: 'blue.600' }}
            px="4"
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="4">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="yellow" onClick={handleAddContact}>
            Add Contact
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
        <Button colorScheme='yellow' onClick={onOpen} >
            +
        </Button>
      </Box>
    </Box>
 
       <Box w={["100%" , "100%" ,"100%" , "70%"]} mt={['10', '20', '50px', '50px']} p={['6', '8', '10', '10']} m="auto">
       {
        data && data.length > 0 ? (
            <TableContainer
            border="1px solid #999"
            bg="#fff"
            borderRadius="22px"
            boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.06), 1px 2px 5px 0px rgba(0, 0, 0, 0.06), 4px 8px 9px 0px rgba(0, 0, 0, 0.05), 9px 18px 12px 0px rgba(0, 0, 0, 0.03), 16px 32px 14px 0px rgba(0, 0, 0, 0.01), 25px 49px 16px 0px rgba(0, 0, 0, 0.00)"
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Email</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              {data.map((item) => (
                <Tbody key={item._id} >
                  <Tr>
                    <Td>{item.firstName} {item.lastName}</Td>
                    <Td>{item.phone}</Td>
                    <Td>{item.email}</Td>
                    <Td display="flex" gap={5}>
                    <Modal isOpen={editisOpen} onClose={editOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={editingContact?.firstName || ''}
                onChange={(e) => setEditingContact({ ...editingContact, firstName: e.target.value })}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={editingContact?.lastName || ''}
                onChange={(e) => setEditingContact({ ...editingContact, lastName: e.target.value })}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                name="phone"
                value={editingContact?.phone || ''}
                onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={editingContact?.email || ''}
                onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" onClick={handleUpdateContact}>
              Update Contact
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
                      <Button
                        bg="#ffff"
                        variant="outline"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        bg="#ffff"
                        onClick={() => handleDelete(item._id)}
                        color="red"
                        variant="outline"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
             ))}
            </Table>
          </TableContainer>
        )  : null
    }      
                  
                
                </Box>
    </Box>
  )
}

export default Home