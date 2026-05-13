import clsx from 'clsx';
interface CSkeletonProps {
    amount?: number;
    height?: number;
    width?: number;
    stickWidth?: number;
    stickHeight?: number;
}
const CSkeleton = ({ amount = 3, height, stickHeight, stickWidth, width }: CSkeletonProps) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[...Array(amount)].map((_, i) => (
                    <div key={i} className="border-2 rounded-lg p-4 animate-pulse">
                        <div
                            className={clsx(
                                'bg-gray-200 rounded-lg mb-4',
                                height ? height : 'h-72',
                                width ? width : 'w-full'
                            )}
                        />
                        <div
                            className={clsx(
                                'bg-gray-200 rounded mb-2',
                                stickHeight ? stickHeight : 'h-4'
                            )}
                        />
                        <div
                            className={clsx(
                                ' bg-gray-200 rounded w-2/3',
                                stickHeight ? stickHeight : 'h-4',
                                stickWidth ? stickHeight : 'w-2/3'
                            )}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default CSkeleton;
