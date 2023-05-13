import React, { useState, useEffect } from 'react'
import { TeamMember } from '../../../../types/TeamMember'
import { TeamSocialIcon } from '../../TeamSocialIcon'
import Modal from './Modal'
import { FadeInWhenVisible } from '../../../shared/FadeInWhenVisible'
import Image from "next/legacy/image"

type TeamCardProps = {
  teamMember: TeamMember
  idx: number
  showDetails: boolean
  handleShowDetails?: (member: TeamMember | null) => void
}

const TeamCard: React.FC<TeamCardProps> = ({
  teamMember,
  idx,
  showDetails,
  handleShowDetails,
}) => {
  // console.log('teamMember', teamMember)
  return (
    <div
      className="flex max-w-xs justify-center overflow-hidden rounded-xl   bg-[#212529] md:px-2"
      key={teamMember.id}
    >
      <div className="flex flex-col justify-between items-center">
        <div className="border-radius relative z-20 flex w-full items-center justify-center">
          <img
            // loading='lazy'
            src={teamMember.image}
            alt={teamMember.name}
            className="h-72 w-full rounded-xl bg-white object-contain object-center p-0"
          />
        </div>
        <div
          className="flex flex-1 w-80"
          // className="relative z-10 flex h-full p-6 -mt-8 border border-gray-500 backdrop-blur"
        >
          <div className="box-border flex flex-1 flex-col h-full min-h-[250px] w-full justify-between  ">
            {/* // className="flex flex-col justify-between h-full" */}
            <div className="">
              <div className="flex w-full flex-col justify-between text-start">
                <p className="px-4 py-1 ml-2 h-16 w-full  text-2xl font-semibold text-zinc-100 dark:text-black mt-2">
                  {teamMember.name}
                </p>
               
              </div>

              <div className=" w-full text-start mb-4">
                <p className="px-4 mb-2 ml-2 whitespace-pre text-base font-medium leading-tight text-zinc-100 dark:text-black lg:text-lg">
                  {teamMember.title}
                </p>
                
                {teamMember?.category === 'Leadership' ||
                teamMember?.category === 'Advisors' ? (
                  <p className="px-4 text-zinc-100 dark:text-black font-thin line-clamp-6 ml-2">
                    {teamMember.shortDescription}
                  </p>
                ) : null}
              </div>
            </div>

            {teamMember?.category !== 'Leadership' && (
              <div className="m-2 flex justify-between items-center">
                <button
                  className="flex font-mono text-sm font-medium ml-2 text-[#A855F7] duration-300 ease-in-out hover:text-white dark:hover:text-black md:text-base underline hover:underline-offset-2"
                  onClick={() => {
                    // setShowModal(!showModal)
                    handleShowDetails && handleShowDetails(teamMember)
                  }}
                >
                  Show more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="flex items-center justify-center px-1">
                  <TeamSocialIcon teamMember={teamMember} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeamCard
