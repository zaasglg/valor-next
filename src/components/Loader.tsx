"use client"

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'blue' | 'white' | 'gray' | 'orange' | 'black';
    text?: string;
    className?: string;
    type?: 'spinner' | 'dots';
}

export default function Loader({ 
    size = 'md', 
    color = 'blue', 
    text,
    className = '',
    type = 'dots'
}: LoaderProps) {
    const sizeClasses = {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-3 h-3',
        xl: 'w-4 h-4'
    };

    const colorClasses = {
        blue: 'bg-blue-600',
        white: 'bg-white',
        gray: 'bg-gray-600',
        orange: 'bg-orange-600',
        black: 'bg-gray-900'
    };

    const textSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
    };

    if (type === 'spinner') {
        const spinnerSizeClasses = {
            sm: 'w-4 h-4',
            md: 'w-8 h-8',
            lg: 'w-12 h-12',
            xl: 'w-16 h-16'
        };

        const spinnerColorClasses = {
            blue: 'border-blue-600 border-t-transparent',
            white: 'border-white border-t-transparent',
            gray: 'border-gray-600 border-t-transparent',
            orange: 'border-orange-600 border-t-transparent',
            black: 'border-gray-900 border-t-transparent'
        };

        return (
            <div className={`flex flex-col items-center justify-center ${className}`}>
                <div 
                    className={`${spinnerSizeClasses[size]} border-2 ${spinnerColorClasses[color]} rounded-full animate-spin`}
                ></div>
                {text && (
                    <p className={`mt-2 ${textSizeClasses[size]} text-gray-600 font-medium`}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className="flex space-x-1">
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
            {text && (
                <p className={`mt-2 ${textSizeClasses[size]} text-gray-600 font-medium`}>
                    {text}
                </p>
            )}
        </div>
    );
}
