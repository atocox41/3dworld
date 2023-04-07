import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// import "./animation.css";

type Props = {
  onButtonClick: (buttonName: string) => void;
};



const AnimationCity = ({ onButtonClick }: Props) => {
  const handleButtonClick = (buttonName: string) => {
    console.log(`Button ${buttonName} clicked!`);
    onButtonClick(buttonName);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };


  return (
    <div className="flex scale-75 md:scale-100 lg:scale-100 justify-center m-auto mt-[100px] w-[100%] ">

      
      {/* smaller image */}
      {/* <img
    className="z-10 flex flex-col justify-center mt-[-50px] h-[300] w-[400px]  mb-[50px]"
    src="images/trigan-section-bg-c.png"
    alt="planet"
/> */}
      {/* max-[600px]:w-[400px]  max-[800px]:w-[600px] w-[900px]  */}
      <div data-aos="fade-up" className="absolute z-0 flex-col w-[1000px] max-[1100px]:w-[900px] max-[950px]:w-[850px] max-[870px]:w-[800px] aos-init">

        {/* <div data-aos="fade-left" className="flex border-b-4 border-gradient-l-black-violet flex-col justify-end  h-[40px]  items-start ml-[300px] max-[950px]:ml-[150px] max-[800px]:mt-[-20px] max-[800px]:ml-[200px] max-[640px]:ml-[280px] max-[560px]:ml-[220px] max-[500px]:mt-[-20px] max-[500px]:ml-[250px] max-[500px]:h-[20px] max-[445px]:ml-[270px]  ">
        <button onClick={() => handleButtonClick('AI Assisted Communities')}>
              <h2 className="text-xl  max-[870px]:text-md max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">AI Assisted Communities</h2>
          </button>
        </div> */}
               <button onClick={() => handleButtonClick('AI Assisted Communities')} >

        <div data-aos="fade-left" className="border-b-4 border-gradient-l-black-violet flex flex-col justify-end mt-[20px] h-[100px] m-auto items-start ml-[50px] max-[800px]:h-[60px] max-[720px]:h-[50px] max-[800px]:ml-[100px] max-[800px]:mt-[30px] max-[640px]:ml-[200px] max-[560px]:ml-[165px] max-[500px]:ml-[185px] max-[445px]:ml-[200px] aos-init">

          <h2 className="text-left text-xl max-[870px]:text-md max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">AI Assisted Communities</h2>
       
        </div>
           </button>
        <div data-aos="fade-left" className="border-b-4 border-gradient-l-black-violet flex flex-col justify-end mt-[20px] h-[100px] m-auto items-start ml-[50px] max-[800px]:h-[60px] max-[720px]:h-[50px] max-[800px]:ml-[100px] max-[800px]:mt-[30px] max-[640px]:ml-[200px] max-[560px]:ml-[165px] max-[500px]:ml-[185px] max-[445px]:ml-[200px] aos-init">
        <button onClick={() => handleButtonClick('Ecological Safeguards')}>

          <h2 className="text-left text-xl max-[870px]:text-md max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">Ecological Safeguards</h2>
          </button>
        </div>

        <div data-aos="fade-right" className="flex border-b-4 border-gradient-r-black-violet flex-col justify-end h-[40px] m-auto items-end max-[800px]:h-[50px] max-[800px]:w-[90%] max-[720px]:w-[80%] max-[720px]:h-[25px] max-[640px]:w-[70%] max-[640px]:w-[65%] max-[500px]:w-[420px] aos-init">
        <button onClick={() => handleButtonClick('Unified loT  Data Layer')}>
          <h2 className="text-right text-xl max-[870px]:text-md max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">Unified loT  Data Layer</h2>
          </button>

        </div>
        <div data-aos="fade-right" className="flex border-b-4 border-gradient-r-black-violet flex-col justify-end relative h-[180px] items-end max-[870px]:h-[100px] max-[800px]:w-[95%] max-[720px]:w-[90%] max-[640px]:w-[85%] max-[560px]:w-[83%] max-[500px]:h-[50px] max-[500px]:w-[615px] aos-init">
        <button onClick={() => handleButtonClick('The First Urban Blockchain')}>
         <h2 className="text-right text-xl max-[870px]:text-md max-[800px]:text-[15px] max-[640px]:text-[12px] max-[500px]:text-[10px]">The First Urban Blockchain</h2>
         </button>
        </div>

      </div>
      <img
        className="flex flex-col justify-center mt-[-50px] h-[300] w-[700px]  mb-[50px] max-[700px]:w-[400px]  max-[950px]:w-[600px] max-[800px]:w-[500px] max-[720px]:w-[400px] max-[560px]:w-[350px] max-[500px]:w-[290px]"
        src="images/trigan-section-bg-c.png"
        alt="planet"
      />
    </div>
  );
};

export default AnimationCity;
