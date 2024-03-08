# HomeRouterSecurity_2020_Bericht.pdf

Tags: routers, statistics
Data: Figure 3.2 shows the Linux Kernel versions present on the devices. More than 1/3 of the devices
use a kernel version 2.6.36 or even older versions. The last security update for 2.6.36 was provided on February 17th 2011 according to Wikipedia6
. That is 9 years without security patches.
Kernel version 2.6.32 was kind of a long term support (lts) kernel and got its last security update
in 2016. However, none of the evaluated routers used this lts kernel. The oldest kernel version
was found in the Linksys WRT54GL which is powered by a 2.4.20 Linux Kernel released in 2002.
AVM is the only vendor that has not a single device running a 2.6 or older kernel. 46% of AVMs
devices are powered by 4.4 Linux Kernel, which is maintained until today. Nevertheless, more
than half of the AVM devices run kernel versions that are not maintained anymore. Figure 3.2
shows that the other vendors are even worse.
Figures 3.3, 3.4 and 3.5 show the known vulnerabilities perspective on this data. As you can see,
even the «best» devices have at least 21 critical or 348 high rated CVEs. The routers are affected
by 53 critical CVEs on average according to our noc rating. The worst case regarding high severity CVEs is the Linksys WRT54GL powered by the oldest kernel found in our study as mentioned
above. There are 579 high severity CVEs affecting this product. The worst cases according the
noc rating are Zyxel NBG6816 and Zyxel NBG6815 affected by 68 critical CVEs.
We refer to our noc rating at this point, because our data shows that critical CVEs according to
CVSS v3.0 rating are not a good rating to compare old software with newer software. Figure
3.4 states that the mean (orange line) of critical CVEs per Firmware in AVM devices is higher
than the mean of all devices, even if AVM uses more recent kernel versions than others. On the
other hand Netgear seems to perform very good, even if half of their devices use a kernel that
was not patched in nine years. This does not sound plausible, but it can be explained easily. As
mentioned above, the CVSS v2.0 does not define «critical» CVEs and older CVEs do not have a
CVSS v3.0 rating. This means even if a vulnerability of an old kernel would be ranked as «critical»
in the means of the CVSS v3.0 rating, it is not part of this statistic. If we have look at our noc or
the high rating, the data is much more plausible.
In conclusion, there is not a single device without known critical vulnerabilities. Another interesting fact is that even if a router was updated in the last year (compare with section 3.1), software
versions known for vulnerabilities were not necessarily replaced by newer ones. Otherwise there
would not be so many devices utilizing a 2.6 Linux Kernel.
Section: Perimeter Security