import Image from 'next/image'
import { ReactNode } from 'react'

interface FooterLogoProps {
  children?: ReactNode
}

export const FooterLogo: React.FC<FooterLogoProps> = () => {
  return (
    <div className="z-20 flex flex-col items-center justify-center">
      <div className="relative h-48 w-48">
        <Image layout="fill" src="/images/footer-logo.svg" alt="Footer Logo" />
      </div>
      <p className="pl-3 font-blanka text-2xl tracking-[0.3em]">TRIGAN</p>
    </div>
  )
}
