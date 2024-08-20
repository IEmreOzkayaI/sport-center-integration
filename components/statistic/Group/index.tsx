'use client';

import { FROM_OLD_TO_NOW, TOTAL_SPORT_CENTER } from '@/constants';
import { Building } from 'lucide-react';
import StatisticCard from '../Card';
import { renderProfitStatisticCards, renderUserStatisticCards } from './components';
import { useHook } from './useHook';

export default function StatisticGroup({ sportCenters, totalMemberAmount, activeMemberAmount, inActiveMemberAmount, pendingMemberAmount, totalProfit }: any) {
  const { session, userStatisticIndex, profitStatisticIndex, handleUserStatisticIndex, handleProfitStatisticIndex } = useHook();

  return (
    <>
      {session?.role === 'admin' && <StatisticCard className="w-auto md:w-full" title={TOTAL_SPORT_CENTER} value={sportCenters?.data?.result?.length} icon={<Building className="h-4 w-4 text-muted-foreground" />} subText={FROM_OLD_TO_NOW} />}

      {renderUserStatisticCards(userStatisticIndex, handleUserStatisticIndex, totalMemberAmount, activeMemberAmount, inActiveMemberAmount, pendingMemberAmount)}

      {renderProfitStatisticCards(profitStatisticIndex, handleProfitStatisticIndex, totalProfit)}
    </>
  );
}
