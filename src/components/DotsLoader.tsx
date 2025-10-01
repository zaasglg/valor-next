"use client"

interface DotsLoaderProps {
    className?: string;
    color?: 'black' | 'white' | 'gray';
    size?: 'sm' | 'md' | 'lg';
}

export default function DotsLoader({ 
    className = '', 
    color = 'black',
    size = 'sm'
}: DotsLoaderProps) {
    const sizeClasses = {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-3 h-3'
    };

    const colorClasses = {
        black: 'bg-gray-900',
        white: 'bg-white',
        gray: 'bg-gray-600'
    };

    return (
        <div className={`flex space-x-1 ${className}`}>
            <div 
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`} 
                style={{animationDelay: '0ms'}}
            ></div>
            <div 
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`} 
                style={{animationDelay: '150ms'}}
            ></div>
            <div 
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`} 
                style={{animationDelay: '300ms'}}
            ></div>
        </div>
    );
}
