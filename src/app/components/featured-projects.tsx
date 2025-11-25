'use client';
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
      src: 'pholder.png',
      image: 'pholder.png',
      featured: true,
      githubUrl: 'https://github.com/alef-garrido/nomad_proxy',
      liveUrl: 'https://nomad-proxy.vercel.app/',
      color: '#b1b1b1'
    },
    {
      title: 'Gamified Learning Platform',
      description: 'This is a description for Project Beta.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      src: 'pholder.png',
      image: 'pholder.png',
      featured: false,
      githubUrl: 'https://github.com/alef-garrido/elearning-camp-FullStack',
      liveUrl: 'https://elearning-camp-full-stack-frontend.vercel.app/',
      color: '#b1b1b1'
    },
    // {
    //   title: 'Xnoria Registration System',
    //   description: 'This is a description for Project Gamma.',
    //   tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    //   src: 'pholder.png',
    //   image: 'pholder.png',
    //   featured: false,
    //   githubUrl: 'https://github.com/alef-garrido/xnoria-alpha-registrationList',
    //   liveUrl: '#',
    //   color: '#b1b1b1'
    // },
    {
      title: 'ECOM Quiz Funnel',
      description: 'This is a description for Project Delta.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      src: 'pholder.png',
      image: 'pholder.png',
      featured: false,
      githubUrl: '#',
      liveUrl: 'https://github.com/alef-garrido/ecom-test-business-owners',
      color: '#b1b1b1'
    },
  ];

  const menuItems = projects.map(project => ({
    link: project.liveUrl || '#',
    text: project.title,
    image: project.image,
    onClick: () => openModal(project),
  }));

  return (
    <div className="grid w-full my-48 px-6 md:px-12">
      <h2 className="text-5xl font-bold text-secondary mb-8 font-mono text-center">Featured Projects</h2>
          <div className="min-h-[500px] p-4 rounded-lg relative">
            <FlowingMenu items={menuItems} />
      </div>
      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
      )}
    </div>
  );
};

export default FeaturedProjects;
