
const AvatarStatus = ({ src, alt, size }) => {
    return (
        <div className="relative">
            <img
                className={`rounded-full ${size}`}
                src={src}
                alt={alt}
            />
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-1 ring-white bg-green-500"></span>
        </div>
    );
};

export default AvatarStatus;