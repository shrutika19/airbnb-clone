import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faTv, faPersonSwimming, faCar, faPaw, faLaptop } from '@fortawesome/free-solid-svg-icons';

const getIconForPerk = (perk) => {
    switch (perk.toLowerCase()) {
        case 'wifi':
            return faWifi;
        case 'tv':
            return faTv;
        case 'pool':
            return faPersonSwimming;
        case 'parking':
            return faCar;
        case 'workspace':
            return faLaptop;
        case 'pets':
            return faPaw
        default:
            return null; // You can add more cases or handle unknown perks as needed
    }
};

const PerksData = ({ perks }) => {
    return (

        <>
            <h2 className='font-semibold text-xl'>What this place offers</h2>
            <div className='grid mt-2 gap-2 md:grid-cols-3 lg:grid-cols-3'>
                {perks.map((perk, index) => (
                    <div key={index} >
                        <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                            <FontAwesomeIcon icon={getIconForPerk(perk)} />
                            <span>{perk.charAt(0).toUpperCase() + perk.slice(1)}</span>
                        </label>
                    </div>
                ))}
            </div>
        </>


    );
};

export default PerksData;
