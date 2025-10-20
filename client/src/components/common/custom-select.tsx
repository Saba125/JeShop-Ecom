import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
interface Data {
    label: string;
    value: number;
}
interface CSelectProps {
    placeholder?: string;
    label: string;
    data: Data[];
    value: string;
    onChange: (val:string) => void;
}
const CSelect = ({ label, placeholder, data, value,onChange }: CSelectProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full" >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {data.map((item) => (
                        <SelectItem key={item.value} value={String(item.value)}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default CSelect;
