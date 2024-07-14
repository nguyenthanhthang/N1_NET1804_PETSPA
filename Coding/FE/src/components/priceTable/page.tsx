import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function PriceTable() {
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Chó</TableColumn>
                <TableColumn>Giá</TableColumn>
                <TableColumn >Mèo</TableColumn>
                <TableColumn>Giá</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>Dưới 2 kg</TableCell>
                    <TableCell>70.000</TableCell>
                    <TableCell>Dưới 2 kg</TableCell>
                    <TableCell>100.000</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>2 - 4 kg</TableCell>
                    <TableCell>100.000</TableCell>
                    <TableCell>2 - 5 kg</TableCell>
                    <TableCell>150.000</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>5 - 9 kg</TableCell>
                    <TableCell>150.000</TableCell>
                    <TableCell>....</TableCell>
                    <TableCell>....</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>10 - 14 kg</TableCell>
                    <TableCell>250.000</TableCell>
                    <TableCell>....</TableCell>
                    <TableCell>....</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}