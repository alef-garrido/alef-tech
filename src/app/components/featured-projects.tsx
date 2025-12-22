"use client";
import React from 'react';
import useModal from '../hooks/use-modal';
import ProjectModal from './project-modal';
import { project } from '../../../types';
import FlowingMenu from './flowing-menu';

const FeaturedProjects = () => {
  const { isModalOpen, selectedProject, openModal, closeModal } = useModal();

  const projects: project[] = [
    {
      title: 'Nomad_Proxy Traveller Platform',
      description: 'This is a description for Project Alpha.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        src: '/assets/pholder.svg',
        image: '/assets/pholder.svg',
      featured: true,
      githubUrl: 'https://github.com/alef-garrido/nomad_proxy',
      liveUrl: 'https://nomad-proxy.vercel.app/',
      color: '#b1b1b1'
    },
    {
      title: 'Gamified Learning Platform',
      description: 'This is a description for Project Beta.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        src: '/assets/pholder.svg',
        image: '/assets/pholder.svg',
      featured: false,
      githubUrl: 'https://github.com/alef-garrido/elearning-camp-FullStack',
      liveUrl: 'https://elearning-camp-full-stack-frontend.vercel.app/',
      color: '#b1b1b1'
    },
    {
      title: 'ECOM Quiz Funnel',
      description: 'This is a description for Project Delta.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      src: 'pholder.svg',
      image: 'pholder.svg',
      featured: false,
      githubUrl: 'https://github.com/alef-garrido/ecom-test-business-owners',
      liveUrl: 'https://github.com/alef-garrido/ecom-test-business-owners',
      color: '#b1b1b1'
    },
  ];

  const menuItems = projects.map(project => ({
    link: project.liveUrl || '#',
    text: project.title,
    image: `/assets/${project.image}`,
    onClick: () => openModal(project),
  }));

  return (
    <div className="grid w-full my-48 px-6 md:px-12">
      src: '/assets/pholder.svg',
      image: '/assets/pholder.svg',
            <FlowingMenu items={menuItems} />
      </div>
      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
    image: project.image,
    </div>
  );
};

export default FeaturedProjects;
