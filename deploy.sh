#!/usr/bin/bash

echo "#################################### Build #####################################"
[ -d public_html/ ] && rm -r public_html

mkdir public_html \
	&& cp -r *.html *.css scripts/ assets/ public_html/ \
	&& tar czf public_html.tar.gz public_html/ \
	&& rm -r public_html/
echo ""

echo "#################################### Backup prod ###############################"
ssh metmesh "tar czf ~/domains/naukajazdyromek.pl/public_html_bak.tar.gz ~/domains/naukajazdyromek.pl/public_html"
echo ""

echo "#################################### Deploy ####################################"
scp public_html.tar.gz metmesh:/home/metmesh \
	&& rm public_html.tar.gz

ssh -T metmesh << EOL
	rm -r ~/domains/naukajazdyromek.pl/public_html \
		&& tar xzf ~/public_html.tar.gz -C ~/domains/naukajazdyromek.pl/
EOL
