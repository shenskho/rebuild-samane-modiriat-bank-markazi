import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import Proptypes from 'prop-types'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { useLayout } from '@hooks/useLayout'
import { getRoutes } from '@src/router/routes'

const BreadCrumbs = ({ additional }) => {
  const { layout } = useLayout()
  const allRoutes = getRoutes(layout)
  const breadcrumb = useBreadcrumbs(allRoutes)
  const slicedBreadcrumb = breadcrumb.splice(2)

  const renderBreadCrumbs = () => {
    const breadcrumbItems = slicedBreadcrumb.map(({ match, breadcrumb }, index) => {
      const isLastItem = slicedBreadcrumb.length - 1 === index
      const Wrapper = isLastItem ? Fragment : Link
      return (
        <BreadcrumbItem tag='li' key={match.pathname}>
          <Wrapper {...(!isLastItem ? { to: match.pathname } : {})}>{breadcrumb}</Wrapper>
        </BreadcrumbItem>
      )
    })
    const breadcrumbAdditionalItems = additional.map((item, index) => {
      const Wrapper = item.link ? Link : Fragment
      return (
        <BreadcrumbItem tag='li' key={index}>
          <Wrapper {...(item.link ? { to: item.link } : {})}>{item.title}</Wrapper>
        </BreadcrumbItem>
      )
    })
    return [...breadcrumbItems, ...breadcrumbAdditionalItems]
  }

  return (
    <div className='content-header mb-1'>
      <div className='breadcrumb-wrapper vs-breadcrumbs'>
        <Breadcrumb>
          <BreadcrumbItem tag='li'>
            <Link to='/'>صفحه اصلی</Link>
          </BreadcrumbItem>
          {renderBreadCrumbs()}
        </Breadcrumb>
      </div>
    </div>
  )
}
export default BreadCrumbs

BreadCrumbs.propTypes = {
  additional: Proptypes.arrayOf(
    Proptypes.shape({
      link: Proptypes.string,
      title: Proptypes.oneOfType([Proptypes.string, Proptypes.number])
    })
  )
}

BreadCrumbs.defaultProps = {
  additional: []
}
