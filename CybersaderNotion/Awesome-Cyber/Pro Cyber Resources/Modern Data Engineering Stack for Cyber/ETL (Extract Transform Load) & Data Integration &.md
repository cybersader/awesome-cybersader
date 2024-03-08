# ETL (Extract Transform Load) & Data Integration & Data Replication

# Lists & Resources

- [https://github.com/pawl/awesome-etl](https://github.com/pawl/awesome-etl)
- [https://github.com/johnberrydev/awesome-data-integration](https://github.com/johnberrydev/awesome-data-integration#B2B-Software)
- [informatica etl - Brave Search](https://search.brave.com/search?q=informatica+etl&source=desktop)
- [cybersecurity etl b2b data integration - Brave Search](https://search.brave.com/search?q=cybersecurity+etl+b2b+data+integration&source=desktop)
- [Data Integration Tools Reviews 2022 | Gartner Peer Insights](https://www.gartner.com/reviews/market/data-integration-tools)
- [Informatica](https://www.informatica.com/data-integration-magic-quadrant.html)
- [Live Data Integration vs. Data Replication](https://www.cdata.com/resources/replicationvslivedata/)
- [2020 Gartner Magic Quadrant for Data Integration Tools – BMC Software | Blogs](https://www.bmc.com/blogs/gartner-magic-quadrant-data-integration-tools/)
- [5 Strategic Technologies On The Gartner Hype Cycle For Midsize Enterprises 2018](https://www.gartner.com/smarterwithgartner/5-strategic-technologies-on-the-gartner-hype-cycle-for-midsize-enterprises-2018)
- [data ops - Brave Search](https://search.brave.com/search?q=data+ops&source=desktop)
- [data fabric - Brave Search](https://search.brave.com/search?q=data+fabric&source=desktop)
- [Using Data Fabric Architecture to Modernize Data Integration](https://www.gartner.com/smarterwithgartner/data-fabric-architecture-is-key-to-modernizing-data-management-and-integration)

## No-Code Integration & Automation Tools

- [https://onlizer.com/](https://onlizer.com/)
- [https://pipedream.com/](https://pipedream.com/)
- [https://n8n.io/](https://n8n.io/)
- [https://www.make.com/](https://www.make.com/)
- [https://zapier.com/](https://zapier.com/)

# Opinionated Data Integration & ETL Tools

- [WayScript](https://www.wayscript.com/) - way to avoid setting up a server yourself.  Run code and interact with APIs.
- [Airbyte | Open-Source Data Integration Platform | ELT tool](https://airbyte.com/) - Free by self-hosting with Docker.  Cheap cloud options.
- [Jitsu : Open Source Data Integration Platform](https://jitsu.com/) - Open-source alternative to Segment.  Free by self-hosting with Docker.

# Opinionated ETL Workflows

## Connecting Two Databases for Complex Transformations

<aside>
💡 Most ETL/ELT tools **(especially free ones)** are limited in the kinds of transformations that they can do.

</aside>

### Cloud-Hosted

- Data Sources → ( Cloud Server [ Digital Ocean, AWS, Azure ] → ( Airbyte ) ) → Data Targets
- Data Sources → ( [n8n.io](http://n8n.io) , Pipedream, Make) → Data Targets

### Self-Hosted

- Data Sources → Airbyte ( docker container ) OR Jitsu (docker container) → Data Targets
- Data Sources → ( [n8n.io](http://n8n.io) , Pipedream) → Data Targets