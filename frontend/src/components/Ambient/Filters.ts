import { FILTER_ACTION_APPEND, AllFilterTypes, FilterValue, RunnableFilter } from 'types/Filters';
import { ZtunnelService, ZtunnelWorkload } from 'types/IstioObjects';

const byNamespaces = (namespaces: FilterValue[]): RunnableFilter<ZtunnelService | ZtunnelWorkload> => {
  return {
    category: 'Namespaces',
    placeholder: 'Filter by Namespace',
    filterType: AllFilterTypes.typeAhead,
    action: FILTER_ACTION_APPEND,
    filterValues: namespaces,
    run: (item, filters) => filters.filters.some(f => f.value === item.namespace)
  };
};

const byServices = (services: FilterValue[]): RunnableFilter<ZtunnelService | ZtunnelWorkload> => {
  return {
    category: 'Services',
    placeholder: 'Filter by Service',
    filterType: AllFilterTypes.typeAhead,
    action: FILTER_ACTION_APPEND,
    filterValues: services,
    run: (item, filters) => filters.filters.some(f => f.value === item.name)
  };
};

export const ztunnelFilters = (
  ztunnelItems: ZtunnelService[] | ZtunnelWorkload[]
): RunnableFilter<ZtunnelService | ZtunnelWorkload>[] => {
  const namespaces = new Set<string>();
  const services = new Set<string>();

  ztunnelItems.forEach((item: ZtunnelService | ZtunnelWorkload) => {
    namespaces.add(item.namespace);
    services.add(item.name);
  });

  return [
    byNamespaces(
      Array.from(namespaces)
        .sort()
        .map(w => ({ id: w, title: w }))
    ),
    byServices(
      Array.from(services)
        .sort()
        .map(w => ({ id: w, title: w }))
    )
  ];
};
