import { motion } from 'framer-motion';

const LeadNurturingIcon = () => {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Pattern */}
      <motion.g opacity="0.05">
        <motion.path d="M50 35L65 28L80 35L80 49L65 56L50 49L50 35Z" fill="url(#hex-gradient)" />
        <motion.path d="M120 35L135 28L150 35L150 49L135 56L120 49L120 35Z" fill="url(#hex-gradient)" />
        <motion.path d="M85 85L100 78L115 85L115 99L100 106L85 99L85 85Z" fill="url(#hex-gradient)" />
        <motion.path d="M50 135L65 128L80 135L80 149L65 156L50 149L50 135Z" fill="url(#hex-gradient)" />
        <motion.path d="M120 135L135 128L150 135L150 149L135 156L120 149L120 135Z" fill="url(#hex-gradient)" />
      </motion.g>

      {/* Central Flow Container */}
      <motion.path
        className="flow-container"
        d="M40 100C40 65 65 40 100 40C135 40 160 65 160 100C160 135 135 160 100 160C65 160 40 135 40 100Z"
        fill="url(#container-gradient)"
        fillOpacity="0.05"
        stroke="url(#container-stroke)"
        strokeWidth="2.5"
        strokeDasharray="4 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Stage Hexagons */}
      <motion.g>
        {/* Leads Stage */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.path
            d="M95 40L105 35L115 40L115 50L105 55L95 50L95 40Z"
            fill="url(#stage-gradient-1)"
            animate={{ fillOpacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.text
            x="105"
            y="70"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="600"
            fill="white"
            className="drop-shadow-md"
          >
            Leads
          </motion.text>
        </motion.g>

        {/* Nurturing Stage */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.path
            d="M145 95L155 90L165 95L165 105L155 110L145 105L145 95Z"
            fill="url(#stage-gradient-2)"
            animate={{ fillOpacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.text
            x="155"
            y="125"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="600"
            fill="white"
            className="drop-shadow-md"
          >
            Nurturing
          </motion.text>
        </motion.g>

        {/* Qualified Stage */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.path
            d="M95 145L105 140L115 145L115 155L105 160L95 155L95 145Z"
            fill="url(#stage-gradient-3)"
            animate={{ fillOpacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.text
            x="105"
            y="175"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="600"
            fill="white"
            className="drop-shadow-md"
          >
            Qualified
          </motion.text>
        </motion.g>

        {/* Converted Stage */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.path
            d="M35 95L45 90L55 95L55 105L45 110L35 105L35 95Z"
            fill="url(#stage-gradient-4)"
            animate={{ fillOpacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
          <motion.text
            x="45"
            y="125"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            fontWeight="600"
            fill="white"
            className="drop-shadow-md"
          >
            Converted
          </motion.text>
        </motion.g>
      </motion.g>

      {/* Connection Lines */}
      <motion.g stroke="url(#connection-gradient)" strokeWidth="2" strokeDasharray="4 2">
        <motion.path
          d="M105 55C105 55 125 70 155 95"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.path
          d="M165 105C165 105 145 130 115 145"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.path
          d="M95 155C95 155 75 130 55 105"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d="M35 95C35 95 55 70 95 50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </motion.g>

      {/* Flowing Particles */}
      <motion.g>
        {[0, 2, 4].map((delay) => (
          <motion.circle
            key={delay}
            r="3.5"
            fill="url(#particle-gradient)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              delay,
              repeat: Infinity,
            }}
          >
            <animateMotion
              path="M105 55C105 55 125 70 155 95C165 105 145 130 115 145C95 155 75 130 55 105C35 95 55 70 95 50Z"
              dur="6s"
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </motion.circle>
        ))}
      </motion.g>

      <defs>
        <linearGradient id="hex-gradient" x1="0" y1="0" x2="30" y2="30">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#EA580C" stopOpacity="0.2" />
        </linearGradient>

        <linearGradient id="container-gradient" x1="40" y1="40" x2="160" y2="160">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient id="container-stroke" x1="40" y1="40" x2="160" y2="160">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient id="stage-gradient-1" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>

        <linearGradient id="stage-gradient-2" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient id="stage-gradient-3" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        <linearGradient id="stage-gradient-4" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>

        <linearGradient id="connection-gradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient id="text-gradient" x1="0" y1="0" x2="0" y2="20">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        <linearGradient id="particle-gradient" x1="0" y1="0" x2="6" y2="6">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default LeadNurturingIcon; 