
'use client';
import React from 'react';
import useModal from '../hooks/use-modal';
import ProjectModal from './project-modal';
import { project } from '../../../types';

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

  return (
    <div className="w-full my-24 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-secondary mb-8 font-mono text-center">Featured Projects</h2>
          <div className="min-h-[500px] p-4 rounded-lg relative">
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <spline-viewer url="https://prod.spline.design/436WiSJO2IbbKs3w/scene.splinecode"></spline-viewer>
            </div>
            <div className="relative z-10">
              <div className="flex items-center mb-4 justify-center underline">
                <span className="text-green-500 mr-2">$</span>
                <span className="text-white">ls -la projects</span>
              </div>
              <ul className='grid place-items-center'>
                {projects.map((project, index) => (
                  <li key={index} className="flex items-center cursor-pointer text-4xl my-2 font-mono" onClick={() => openModal(project)}>
                    <span className="text-green-500 mr-2">&gt;</span>
                    <span className="text-blue-500 hover:underline">
                      {project.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
      </div>
      {isModalOpen && selectedProject && (
        <ProjectModal project={selectedProject} closeModal={closeModal} />
      )}
    </div>
  );
};

export default FeaturedProjects;
