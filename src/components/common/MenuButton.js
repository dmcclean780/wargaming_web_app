import Button from './Button.js'

export default function MenuButton({title, handleAction}){
    return (
        <div className='w-full h-1/3 grid place-items-center'>
            <div className='w-2/3 h-2/3 px-2 py-1 rounded-lg bg-cam-blue flex flex-col justify-center items-center'>
                <Button 
                    title = {title} 
                    handleAction={handleAction}
                    className='h-full w-full text-2xl md:text-4xl lg:text-6xl font-anton text-white'
                />
            </div>
        </div>
    )
}