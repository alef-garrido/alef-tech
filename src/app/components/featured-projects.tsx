
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
      title: 'Project Alpha',
      description: 'This is a description for Project Alpha.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      src: 'ppicture.png',
      image: 'ppicture.png',
      featured: true,
      githubUrl: '#',
      liveUrl: '#',
      color: '#b1b1b1'
    },
    {
      title: 'Project Beta',
      description: 'This is a description for Project Beta.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      src: 'ppicture.png',
      image: 'ppicture.png',
      featured: false,
      githubUrl: '#',
      liveUrl: '#',
      color: '#b1b1b1'
    },
    {
      title: 'Project Gamma',
      description: 'This is a description for Project Gamma.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      src: 'ppicture.png',
      image: 'ppicture.png',
      featured: false,
      githubUrl: '#',
      liveUrl: '#',
      color: '#b1b1b1'
    },
    {
      title: 'Project Delta',
      description: 'This is a description for Project Delta.',
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      src: 'ppicture.png',
      image: 'ppicture.png',
      featured: false,
      githubUrl: '#',
      liveUrl: '#',
      color: '#b1b1b1'
    },
  ];

  const menuItems = projects.map(project => ({
    link: project.liveUrl,
    text: project.title,
    image: project.image,
  }));

  return (
    <div className="w-full my-24 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-secondary mb-8 font-mono text-center">Featured Projects</h2>
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
