import { Link } from 'react-router-dom';
import { SlashIcon } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
const CBreadCrumb = () => {
    const locations = ['/', ...location.pathname.split('/')];
    const mappedName: any = {
        products: 'პროდუქტები',
        '/': 'მთავარი',
        keyboards: 'კლავიატურები',
        mouses: 'მაუსები',
    };
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {locations.map((item, idx) => (
                    <BreadcrumbItem key={idx}>
                        {item === locations[locations.length - 1] ? (
                            <BreadcrumbPage>{mappedName[item] || item}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink asChild>
                                <Link
                                    to={
                                        idx === 0
                                            ? '/'
                                            : `/${locations.slice(1, idx + 1).join('/')}`
                                    }
                                >
                                    {mappedName[item] || item}
                                </Link>
                            </BreadcrumbLink>
                        )}
                        {idx === 0 ? null : idx === locations.length - 1 ? (
                            <></>
                        ) : (
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default CBreadCrumb;
