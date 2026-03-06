import { useState } from 'react';
import { service } from '../../../types';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<service | null>(null);

  const openModal = (service: service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    selectedService,
    openModal,
    closeModal,
  };
};

export default useModal;
