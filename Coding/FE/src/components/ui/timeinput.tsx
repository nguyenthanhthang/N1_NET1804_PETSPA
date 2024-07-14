// import React from 'react';
// import { TimeInput, TimeInputValue } from '@nextui-org/react';

// interface TimeInputWithErrorProps {
//     label: string;
//     value: string;
//     onChange: (time: TimeInputValue) => void;
//     isInvalid: boolean;
//     errorMessage: string | null;
//     className?: string;
// }

// const TimeInputWithError: React.FC<TimeInputWithErrorProps> = ({
//     label,
//     value,
//     onChange,
//     isInvalid,
//     errorMessage,
//     className,
// }) => {
//     return (
//         <div className={className}>
//             <TimeInput
//                 label={label}
//                 value={value}
//                 onChange={onChange}
//                 hourCycle={24}
//                 isInvalid={isInvalid}
//                 color={isInvalid ? 'danger' : 'default'}
//             />
//             {isInvalid && errorMessage && (
//                 <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
//             )}
//         </div>
//     );
// };

// export default TimeInputWithError;