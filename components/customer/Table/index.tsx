'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import CustomerDialog from '../Dialog';
import Pagination from '../Pagination';
import CustomerTableRow from '../Row';
import CustomerSearch from '../Search';
import { useHook } from './useHook';
import UserNotFound from './components';

export default function CustomerTable({ className, serverCustomers, limit }: { className?: string; serverCustomers?: any; limit: number }) {
  const { page, clientCustomers, handleSearch, handleNext, handlePrev } = useHook(serverCustomers, limit);

  return (
    <div className={cn('min-h-[880px] h-[880px] max-h-[880px] md:min-h-[800px] md:h-[800px] md:max-h-[800px] grid grid-rows-12 shadow border rounded-md', className)}>
      <Card className="row-span-11 shadow-none border-none">
        <CardHeader className="px-7">
          <div className="flex justify-between items-center">
            <CardTitle>Üye Tablosu</CardTitle>
            <div className="hidden md:block">
              <CustomerSearch handleSearch={handleSearch} />
            </div>
            <CustomerDialog title="Üye Ekle" />
          </div>
          <div className="block md:hidden w-full">
            <CustomerSearch handleSearch={handleSearch} />
          </div>
          <CardDescription className="text-center md:text-left">Salon ve Diyetisyen İş Birliğine ait Üyeleri Buradan Görebilirsin</CardDescription>
        </CardHeader>
        {clientCustomers?.data.length === 0 && <UserNotFound />}
        {clientCustomers?.data.length > 0 && (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Statü</TableHead>
                  <TableHead className="text-center">Ad Soyad</TableHead>
                  <TableHead className="hidden sm:table-cell text-center">Paket</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Telefon</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="h-full">
                <CustomerTableRow customerAndInvoiceList={clientCustomers?.data} />
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
      <Pagination className="row-span-1" page={page} limit={limit} count={clientCustomers?.count} next={handleNext} prev={handlePrev} />
    </div>
  );
}
