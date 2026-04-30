import { LayoutGrid, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface EmptyProps {
    cn?: string;
    title: string;
    subTitle?: string;
    icon?: LucideIcon;
    iconCn?: string;
    extraBtn?: string;
    extraBtnCn?: string;
    extraBtnIcon?: LucideIcon;
    extraBtnIconCn?: string;
}
const Empty = ({ cn = 'border-2', title, subTitle, icon: Icon, iconCn, extraBtn,extraBtnCn,extraBtnIcon: IConb,extraBtnIconCn}: EmptyProps) => {
    return (
        <Card className={cn}>
            <CardContent className="text-center py-12">
               {Icon ? <Icon className={iconCn} /> : <LayoutGrid className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />}
                <p className="text-lg font-semibold mb-2">{title}</p>
             {subTitle && (
                   <p className="text-sm text-muted-foreground">
                    {subTitle}
                </p>
             )}
                {extraBtn && (
                    <Button className={extraBtnCn}>
                        {IConb ? <IConb className={extraBtnIconCn}  /> :  null}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default Empty;
