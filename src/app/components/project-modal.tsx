import { X, Github, ExternalLink, Maximize } from 'lucide-react';
import { useEffect } from 'react';
import { project } from '../../types';
import Image from 'next/image';

interface ProjectModalProps {
  project: project;
  closeModal: () => void;
}

const ProjectModal = ({ project, closeModal }: ProjectModalProps) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 bg-cyber-bg">
      {/* Terminal-style header */}
      <div className="terminal-header border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
        </div>
        <div className="flex items-center gap-4 ml-4 flex-1">
          <Maximize size={16} className="cyber-accent" />
          <span className="cyber-text text-sm font-mono">~/projects/{project.title.toLowerCase().replace(/\s+/g, '-')}.exe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="cyber-text-dim text-xs font-mono">Press ESC to exit</span>
          <button
            onClick={closeModal}
            className="bg-cyber-surface border border-cyber-border rounded p-2 
                     hover:border-cyber-accent hover:bg-cyber-accent/10 transition-all duration-300
                     cyber-text hover:cyber-accent"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Full-screen content */}
      <div className="h-[calc(100vh-60px)] overflow-y-auto scrollbar-cyber">
        <div className="min-h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Project media section */}
          <div className="relative bg-cyber-surface border-r border-cyber-border">
            {/* Action buttons overlay - now at the top */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="flex gap-2">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-cyber-surface/90 backdrop-blur-sm border border-cyber-accent 
                                 text-cyber-accent px-4 py-2 rounded-md font-mono font-semibold 
                                 hover:bg-cyber-accent/10 hover:border-cyber-electric hover:text-cyber-electric 
                                 transition-all duration-300 neon-glow text-xs"
                  >
                    <Github size={16} />
                    VIEW_CODE.sh
                  </a>
                ) : (
                  <button
                    className="flex items-center gap-2 bg-cyber-surface/50 border border-cyber-border text-cyber-border px-4 py-2 rounded-md font-mono font-semibold text-xs cursor-not-allowed opacity-60"
                    disabled
                  >
                    <Github size={16} />
                    VIEW_CODE.sh
                  </button>
                )}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-cyber-accent/90 backdrop-blur-sm border border-cyber-accent 
                                 text-cyber-bg px-4 py-2 rounded-md font-mono font-semibold 
                                 hover:bg-cyber-electric hover:border-cyber-electric 
                                 transition-all duration-300 text-xs"
                  >
                    <ExternalLink size={16} />
                    LAUNCH_DEMO.exe
                  </a>
                ) : (
                  <button
                    className="flex items-center gap-2 bg-cyber-accent/30 border border-cyber-border text-cyber-border px-4 py-2 rounded-md font-mono font-semibold text-xs cursor-not-allowed opacity-60"
                    disabled
                  >
                    <ExternalLink size={16} />
                    LAUNCH_DEMO.exe
                  </button>
                )}
              </div>
            </div>
            <div className="sticky top-0 h-screen flex flex-col">
              {/* Media container */}
              <div className="flex-1 relative overflow-hidden">
                {project.videoUrl ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={`/assets/${project.image}`}>
                    <source src={project.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                    <div className={`w-full h-full relative`}>
                        <Image src={`/assets/${project.image}`} layout="fill" objectFit="cover" alt={project.title} />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-cyber-accent/20 rounded-lg border border-cyber-accent flex items-center justify-center">
                          <span className="text-4xl cyber-accent font-mono">&lt;/&gt;</span>
                        </div>
                        <p className="cyber-text font-mono">Project Preview</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Project details section */}
          <div className="bg-cyber-bg">
            <div className="p-4 lg:p-6 space-y-4">
              {/* Project header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="cyber-accent text-xs font-mono">
                      &gt; Loading project metadata...
                    </div>
                    <h1 className="m-4 text-2xl lg:text-3xl font-bold cyber-text neon-text font-mono">
                      {project.title}
                    </h1>
                  </div>
                  {project.featured && (
                    <div className="bg-cyber-accent text-cyber-bg px-2 py-1 rounded text-xs font-bold font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-cyber-bg rounded-full animate-pulse"></span>
                      FEATURED
                    </div>
                  )}
                </div>
                <div className="p-4 cyber-text-dim text-xs font-mono">
                  Status: <span className="cyber-accent">ACTIVE</span> | 
                  Type: <span className="cyber-accent">WEB_APPLICATION</span> | 
                  Access: <span className="cyber-accent">PUBLIC</span>
                </div>
              </div>

              {/* Description */}
              <div className="py-4 space-y-4">
                <h2 className="text-base font-bold cyber-text font-mono border-b border-cyber-border pb-1">
                  &gt; project.description
                </h2>
                <p className="cyber-text-dim leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="py-4 space-y-4">
                <h2 className="text-base font-bold cyber-text font-mono border-b border-cyber-border pb-1">
                  &gt; tech_stack.list()
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.tech.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-cyber-surface border border-cyber-border rounded p-2 
                               hover:border-cyber-accent hover:bg-cyber-accent/5 transition-all duration-300
                               group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyber-accent rounded-full group-hover:animate-pulse"></div>
                        <span className="cyber-text font-mono font-medium group-hover:cyber-accent transition-colors text-xs">
                          {tech}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project stats */}
              <div className="py-4 space-y-4">
                <h2 className="text-base font-bold cyber-text font-mono border-b border-cyber-border pb-1">
                  &gt; system.stats
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-cyber-surface border border-cyber-border rounded p-2 text-center">
                    <div className="cyber-accent text-lg font-bold font-mono">85%</div>
                    <div className="cyber-text-dim text-xs font-mono">COMPLETION</div>
                  </div>
                  <div className="bg-cyber-surface border border-cyber-border rounded p-2 text-center">
                    <div className="cyber-accent text-lg font-bold font-mono">{project.tech.length}</div>
                    <div className="cyber-text-dim text-xs font-mono">TECHNOLOGIES</div>
                  </div>
                  <div className="bg-cyber-surface border border-cyber-border rounded p-2 text-center">
                    <div className="cyber-accent text-lg font-bold font-mono">LIVE</div>
                    <div className="cyber-text-dim text-xs font-mono">STATUS</div>
                  </div>
                </div>
              </div>

              {/* Terminal command line */}
              <div className="border-t border-cyber-border pt-3">
                <div className="bg-cyber-surface border border-cyber-border rounded p-2">
                  <div className="cyber-text-dim text-xs font-mono">
                    <span className="cyber-accent">admin@portfolio:~$</span> git clone {project.title.toLowerCase().replace(/\s+/g, '-')}.git
                    <br />
                    <span className="cyber-accent">admin@portfolio:~$</span> npm install && npm run dev
                    <br />
                    <span className="cyber-text-dim">Cloning into '{project.title.toLowerCase().replace(/\s+/g, '-')}'...</span>
                    <span className="terminal-cursor">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
