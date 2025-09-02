
import React from 'react';

const FeaturedProjects = () => {
  const projects = [
    {
      title: 'Project Alpha',
      link: '#',
    },
    {
      title: 'Project Beta',
      link: '#',
    },
    {
      title: 'Project Gamma',
      link: '#',
    },
    {
      title: 'Project Delta',
      link: '#',
    },
  ];

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 my-24 px-6 md:px-12">
      <h2 className="text-4xl font-bold text-secondary mb-8 font-mono text-center">Featured Projects</h2>
      <div className="font-mono text-left">
        <div className="bg-black p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-green-500 mr-2">$</span>
            <span className="text-white">ls -la projects</span>
          </div>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-500 mr-2">-&gt;</span>
                <a href={project.link} className="text-blue-500 hover:underline">
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
