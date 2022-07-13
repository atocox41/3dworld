import { ReactNode } from 'react'
import { FadeInWhenVisible } from '../../shared/FadeInWhenVisible'
import { Title } from '../../shared/Title'
import { PROJECTS } from './constants'
import { useRouter } from 'next/router'

interface ProjectSectionProps {
  children?: ReactNode
}

export const ProjectSection: React.FC<ProjectSectionProps> = () => {
  const router = useRouter()
  const handleProjClick = async (link: string) => {
    const proj = '/projects/' + link
    await router.push(proj)
    /* const el = document.getElementById(link) */
  }
  return (
    <section
      id="project"
      className=" min-h-screen flex-row items-center bg-primary bg-opacity-80 px-2 font-sans text-white"
    >
      <img
        src="images/trigan-concept-art-001.jpg"
        className="absolute -z-10 hidden h-screen w-auto min-w-full object-fill lg:block"
      />
      <h1 className="pt-5 text-center text-xl font-extralight md:text-5xl">
        The future is at risk.
      </h1>
      <h2 className="py-5 text-center text-xl font-bold md:text-5xl">
        ‍We have the solution.
      </h2>
      <div className="lg:align-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
        {PROJECTS.map((project, i) => {
          return (
            <FadeInWhenVisible duration={i * 0.5} key={project.id}>
              <article
                className=" group mx-auto  max-w-sm transform cursor-pointer"
                /* style={{
                  backgroundImage: `url(/images/project_section_${i + 1}.jpg)`,
                }} */
                onClick={() => handleProjClick(project.link)}
              >
                <div className="flex flex-col flex-wrap bg-opacity-0 duration-300  hover:bg-special hover:bg-opacity-75 md:px-5">
                  <h1 className="text-md py-5 text-white md:text-3xl">
                    {project.name}
                  </h1>
                  <p className="text-sm text-white md:text-xl">
                    {project.content}
                  </p>
                </div>
              </article>
            </FadeInWhenVisible>
          )
        })}
      </div>
    </section>
  )
}

// export const ProjectSection: React.FC<ProjectSectionProps> = () => {
//   const [showMore, setShowMore] = useState(false)
//   return (
//     <section id="project" className="pb-5">
//       <Title title="Project" />
//       <button
//         className="primary-btn my-2 md:my-5"
//         onClick={() => setShowMore(!showMore)}
//       >
//         {showMore ? 'Show Less' : 'Learn More'}
//       </button>
//       <div className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-2 md:px-5 lg:grid-cols-3">
//         {PROJECTS.map((project, i) => {
//           return (
//             <FadeInWhenVisible duration={i * 0.5} key={project.id}>
//               <motion.div
//                 whileHover={{
//                   scale: 1.05,
//                 }}
//                 className="rounded-2xl bg-light-grey text-justify"
//               >
//                 <div className="cursor-pointer rounded-lg p-5">
//                   <div className="relative my-2 h-12 w-12">
//                     <Image
//                       className="filter-primary hover:filter-light-gray"
//                       src={project.img}
//                       alt={project.name}
//                       layout="fill"
//                     />
//                   </div>

//                   <h4 className="text-xl font-semibold">{project.name}</h4>
//                   <h6 className="">{project.description}</h6>

//                   <p
//                     className={`pt-2 transition duration-300 ${
//                       showMore ? 'line-clamp-none' : 'line-clamp-4'
//                     }`}
//                   >
//                     {project.content}
//                   </p>
//                 </div>
//               </motion.div>
//             </FadeInWhenVisible>
//           )
//         })}
//       </div>
//     </section>
//   )
// }
