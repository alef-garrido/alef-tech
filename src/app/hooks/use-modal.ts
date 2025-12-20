import { useState } from 'react';
import { project } from '../../../types';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<project | null>(null);

  const openModal = (project: project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    selectedProject,
    openModal,
    closeModal,
  };
};

export default useModal;
